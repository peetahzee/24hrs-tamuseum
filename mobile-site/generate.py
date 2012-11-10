import glob, string, shutil, os.path

layout_file = open('layout.html', 'r')
layout = layout_file.read()
layout_file.close()

for file_name in glob.glob('./*.html.part'):
	with open(file_name, 'r') as input_file:
		with open('./build/' + file_name[:-5], 'w') as output_file:
			output_file.write(string.replace(layout, '<!--#content-->', input_file.read()))

print 'Compiled data.'


if (os.path.exists('./build/assets') and shutil.rmtree('./build/assets')):
	print 'Cleared data.'

if (shutil.copytree('./assets/', './build/assets/')):
	print 'Copied data.'
