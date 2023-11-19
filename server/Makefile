build:
	docker build -t megacine-server .

run:
	docker run --name megacine-server -p 8888:8888 --env-file .env --rm megacine-server

stop:
	docker stop megacine-server

clean-cache:
	docker system prune -f


# Delete:	docker rmi name:tag
# Delete:	docker rmi -f id