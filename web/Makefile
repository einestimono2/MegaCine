build:
	docker build -t megacine-web .

run:
	docker run --name megacine-web -p 3000:3000 --env-file .env --rm megacine-web

stop:
	docker stop megacine-web

clean-cache:
	docker system prune -f

# Delete:	docker rmi name:tag
# Delete:	docker rmi -f id