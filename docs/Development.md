# Development

To update dependencies and update `./dist` run:

```bash
docker run --rm -v "${PWD}:/usr/src/app:Z" \
  -w /usr/src/app \
  node:24 \
  sh -c "yarn install && yarn lint && yarn dist"
```
