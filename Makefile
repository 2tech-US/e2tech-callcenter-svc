postgres:
	docker run --name e2tech -e POSTGRES_USER=root -e POSTGRES_PASSWORD=secret -p 5432:5432 -d postgres:12-alpine
createdb:
	docker exec -it e2tech createdb --username=root --owner=root callcenter_svc
dropdb:
	docker exec -it e2tech dropdb --username=root callcenter_svc
callcenter_svc:
	java -jar callcenter-svc-1.0-SNAPSHOT.jar
callcenter_web:
	java -jar callcenter-web-1.0-SNAPSHOT.jar
up:
	make postgres
	sleep 1
	make createdb
	make callcenter_svc
	make callcenter_web
down:
	docker stop e2tech
	docker rm e2tech
