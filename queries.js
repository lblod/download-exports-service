import { sparqlEscapeString } from "mu";
import { querySudo as query } from "@lblod/mu-auth-sudo";

export async function getTitleOptions() {
  const queryGetTitles = `
    PREFIX dct: <http://purl.org/dc/terms/>
    PREFIX mu: <http://mu.semte.ch/vocabularies/core/>
    PREFIX nie: <http://www.semanticdesktop.org/ontologies/2007/01/19/nie#>
    PREFIX prov: <http://www.w3.org/ns/prov#>
    PREFIX reporting: <http://lblod.data.gift/vocabularies/reporting/>

    SELECT DISTINCT ?title
    WHERE {
      ?export a reporting:Report ;
        dct:title ?title .
    }
  `;

  const result = await query(queryGetTitles);
  if (result.results.bindings.length) {
    return result.results.bindings.map((res) => res.title.value);
  } else {
    return null;
  }
}

export async function getMostRecentExportInfo(title) {
  const queryGetExportIds = `
    PREFIX dct: <http://purl.org/dc/terms/>
    PREFIX mu: <http://mu.semte.ch/vocabularies/core/>
    PREFIX nie: <http://www.semanticdesktop.org/ontologies/2007/01/19/nie#>
    PREFIX prov: <http://www.w3.org/ns/prov#>
    PREFIX reporting: <http://lblod.data.gift/vocabularies/reporting/>
    PREFIX dbpedia: <http://dbpedia.org/ontology/>
    PREFIX nfo: <http://www.semanticdesktop.org/ontologies/2007/03/22/nfo#>

    SELECT DISTINCT ?uuid ?physicalFile ?fileName ?fileExtension
    WHERE {
      ?export a reporting:Report ;
        dct:title ${sparqlEscapeString(title)} ;
        dct:created ?created ;
        prov:generated ?file .

      ?physicalFile nie:dataSource ?file .

      ?file mu:uuid ?uuid ;
        nfo:fileName ?fileName ;
        dbpedia:fileExtension ?fileExtension .
    }
    ORDER BY DESC(?created)
    LIMIT 1
  `;

  const result = await query(queryGetExportIds);
  if (result.results.bindings.length) {
    const info = {
      uuid: result.results.bindings[0].uuid.value,
      path: result.results.bindings[0].physicalFile.value.replace('share://', '/share/'),
      fileName: result.results.bindings[0].fileName.value,
      fileExtension: result.results.bindings[0].fileExtension.value,
    }
    return info;
  } else {
    return null;
  }
}