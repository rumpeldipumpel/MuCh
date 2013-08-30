#!/usr/bin/env python
import json
import sys
import argparse
import codecs

def parseInfile( ifn ):
	lines = [ line.strip() for line in open( ifn ) ]
	length = len(lines)

	fragen=[]
	for i in range( 0, len(lines)-1, 3 ):
		fragen.append( {"frage": lines[i], "antworten": lines[i+1].split(',') } )

	fragebogen = { "titel":"notitle", "autor":"noautor", "fragen": fragen }

	return fragebogen


def writeToFile( ofn, str ):
	with codecs.open(ofn, "w", "utf-8-sig") as temp:
		temp.write(str.encode('utf-8'))

	return
	f = codecs.open( ofn, 'w', 'utf-8')
	f.write( str )
	f.close()


def main(**kwargs):
	for key, value in kwargs.iteritems():
		print key, value
	
#	print ('kw', kwargs['infile'] )
#	print ('kw' ,kwargs['outfile'] )

#	print sys.argv[0]
#	print sys.argv[1]

	fname = 'input.txt'

	fragebogen = parseInfile( kwargs['infile'] )

	fragebogendump = '{0}\n{1}\n{2}'.format('var fragebogen = ',json.dumps( fragebogen, ensure_ascii=0,indent=1,sort_keys=True ),';')
	#fragebogendump = fragebogendump.encode('utf8')

	
	print fragebogendump
#	writeToFile( kwargs['outfile'], fragebogendump )



if __name__ == '__main__':
	parser = argparse.ArgumentParser()
	parser.add_argument("infile", type=str, help='input file')
	parser.add_argument("outfile", type=str, help='output file')
	args = parser.parse_args()
	main(**vars(args))





