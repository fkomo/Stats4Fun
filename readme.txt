docker build -t fkomo/stats4fun .
docker container stop stats4fun
docker rm stats4fun
docker run -d --name stats4fun -p 8080:80 fkomo/stats4fun
