run:
	docker compose up -d --build

stop:
	docker compose down

pull:
	docker compose pull

clean-cache:
	docker system prune -f