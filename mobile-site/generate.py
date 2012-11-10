import glob, string

layout_file = open('layout.html', 'r')
layout = layout_file.read()
layout_file.close()

for file_name in glob.glob('./*.html.part'):
	with open(file_name, 'r') as input_file:
		with open(file_name[:-5], 'w') as output_file:
			output_file.write(string.replace(layout, '<!--#content-->', input_file.read()))

