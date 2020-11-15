set Pestycydy;
set Skladniki;
param cena{Pestycydy};
param zawartosc{Skladniki, Pestycydy};
param norma{Skladniki};

var ilosc{r in Pestycydy} >=0;

minimize price: sum{r in Pestycydy} ilosc[r] * cena[r];
s.t. demands{s in Skladniki}: sum{r in Pestycydy} ilosc[r] * zawartosc[s, r] >= norma[s];
solve;
printf "%.2f \n", sum{r in Pestycydy} ilosc[r] * cena[r];
end;
