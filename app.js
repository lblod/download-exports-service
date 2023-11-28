import { app, errorHandler } from 'mu';
import {
  getTitleOptions,
  getMostRecentExportInfo,
} from './queries';
import { zip } from 'express-zip';

app.get('/export-names', async function(req, res) {
  const titleOptions = await getTitleOptions();
  return res.status(200).send(titleOptions);
});

app.get('/exports', async function(req, res) {
  try {
    const titleOptions = await getTitleOptions();
    const exportsToDownload = [];

    for(const title of titleOptions) {
      const info = await getMostRecentExportInfo(title);
      exportsToDownload.push({
        path: info.path,
        name: `${info.fileName}.${info.fileExtension}`
      });
    }

    res.zip(exportsToDownload);
  } catch (e) {
    console.log("Something went wrong while calling /exports", e);
    return res.status(500).send();
  }
});

app.get('/exports/:exportName', async function(req, res) {
  try {
    const exportName = req.params.exportName;
    const info = await getMostRecentExportInfo(exportName);

    if (!info) {
      return res.status(404).send();
    } 

    const fileNameWithExtension = `${info.fileName}.${info.fileExtension}`;
    res.setHeader('Content-type', 'text/csv');
    return res.download(info.path, fileNameWithExtension);
  } catch (e) {
    console.log("Something went wrong while calling /exports/:exportName", e);
    return res.status(500).send();
  }
});

app.use(errorHandler);
