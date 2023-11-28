<a name="readme-top"></a>

<br />
<div align="center">
  <h1 align="center">download-exports-service</h1>
  <p align="center">
    Provides endpoints to download the most recent version of data exports (csv files).
    <br />
    <a href="https://github.com/lblod/download-exports-service/issues">Report Bug</a>
    ·
    <a href="https://github.com/lblod/download-exports-service/pulls">Open PR</a>
  </p>
</div>


## 📖 Description

TODO

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## ⏩ Quick setup

### 🐋 Docker-compose.yml
```yaml
  download-exportss:
    image: lblod/download-exports-service
    links:
      - db:database
    labels:
      - "logging=true"
    restart: always
    logging: *default-logging
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## 🔑 Environment variables

| ENV  | description | default | required |
|---|---|---|---|
| TODO | | | |

<p align="right">(<a href="#readme-top">back to top</a>)</p>
