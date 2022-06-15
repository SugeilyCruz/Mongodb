# f = open ('noticia.txt','r')
# p=[]
# for i in f:
#     if ('"fechaC"' in i):
#         for k in i:
#             if k==","
#             p= p+k



f = open ('newsA.txt','r')
w = open ('news.txt','w')
n=1
for i in f:
    if ('"tags"' in i):
        w.write(f'\t\t"tags": ["Cultura","Deporte","Arte","Tecnologia","Politica"],'+"\n")
        n+=1
    else:
        w.write(i)
f.close()
w.close()