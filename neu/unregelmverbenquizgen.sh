#!/usr/bin/env python
# coding=utf-8
import json

fname = 'verben.txt'

lines = [ line.strip() for line in open(fname) ]


fragen_dreiklang=[]
fragen_grammatisch=[]

for li in lines:
	#print(li)
	(infin, praes, praet, perfe) = li.split(',')
	#print(praet)
	perfe = perfe.split(' ')

	
	if perfe[0]=='hat':
		hilfsv = 'hat'
	else:
		hilfsv = 'sein'

	parti = ' '.join( perfe[1:] )
	#print(hilfsv)

	
	dreiklang = [infin,praet,parti]
	vformen = [infin, praes, praet, parti,hilfsv]

	#data = ','.join(vformen)
	#print(data)


	for i in range(0,2):
		tmp = dreiklang[::]
		tmp[i]='? '

		fragen_dreiklang.append(
			{
			"q":', '.join(tmp), 
			"s": dreiklang[i].split('/'),
			"w": []
			} 
		)

	gram = ['Infinitiv','Präsens 3. Person Singular', 'Präteritum 3. Person Singular','Partizip II']
	for g in range(0,4):
		gram[g] = ''.join(['<i>',gram[g],'</i>'])

	#print(gram)
	
	for i in range(0,3):
		for j in range(0,3):
			if i==j:
				continue
			
			fragen_grammatisch.append(
				{"q":' '.join([gram[i],
									'von<br>',  
									''.join(['<b>',vformen[j],'</b>'])
									]),
				"s": [vformen[i].split('/')],
				"w": []
				}
			)

#print(fragen_dreiklang)
#print(fragen_grammatisch)



fragebogen1 = {
	"title":"Unregelmäßige Verben - studio d B1",
	"author":"Timo Ehrlenbach",
	"descr":"Tripel-Übung (Infinitv, Präteritum, Paritizip II)",
	"level":"B1",
	"questions": fragen_dreiklang
}

fragebogen2 = {
	"titel":"Unregelmäßige Verben - studio d B1",
	"autor":"Timo Ehrlenbach",
	"descr":"Grammatik-Übung (Infinitv, Tempus 3. Person Singular)",
	"level":"B1",
	"fragen": fragen_grammatisch
}


fragebogendump = '{0}\n{1}\n{2}'.format('var fragebogen = ',json.dumps( fragebogen2, ensure_ascii=0,indent=1,sort_keys=True ),';')

print(fragebogendump)



