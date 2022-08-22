postgres:
	docker run --name e2tech -e POSTGRES_USER=root -e POSTGRES_PASSWORD=secret -p 5432:5432 -d postgres:12-alpine
createdb:
	docker exec -it e2tech createdb --username=root --owner=root callcenter_svc
dropdb:
	docker exec -it e2tech dropdb --username=root callcenter_svc
up:
	make postgres
	sleep 1
	make createdb
down:
	docker stop e2tech
	docker rm e2tech
