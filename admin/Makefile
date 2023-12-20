build:
	docker build -t megacine-admin .

# rename:
#   docker tag megacine-admin:latest einestimono2/megacine:admin
#   docker rmi megacine-admin

run:
	docker run --name megacine-admin -p 3001:3001 --env-file .env --rm megacine-admin

stop:
	docker stop megacine-admin

clean-cache:
	docker system prune -f

# Delete:	docker rmi name:tag
# Delete:	docker rmi -f id
