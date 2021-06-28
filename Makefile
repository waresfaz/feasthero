.PHONY: client server install run

client:
	cd ./client && npm start

server:
	cd ./server && npm start

run:
	cd ./client && npm start & cd ./server && npm start

install:
	cd ./client && npm install
	cd ./server && npm install