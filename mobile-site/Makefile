generate: *.html.part
	python generate.py

deploy: generate
	rsync  -r build/ cjdev:/var/www/deploy/mobile-site
