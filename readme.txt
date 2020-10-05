# stop/remove old & create/run new docker image
docker stop stats4fun
docker rm stats4fun
docker image prune -a -f
docker build -t fkomo/stats4fun .
docker run -d --name stats4fun -p 8080:80 fkomo/stats4fun

# save
docker save -o stats4fun.dock.tar fkomo/stats4fun

#load/run image
sudo docker stop stats4fun
sudo docker rm stats4fun
sudo docker image prune -a -f
sudo docker load -i stats4fun.dock.tar
sudo docker run -d --name stats4fun -p 8080:80 fkomo/stats4fun
