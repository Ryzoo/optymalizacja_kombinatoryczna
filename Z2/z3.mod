set R;
param P;
param N;
param Z{R};
param W{R};
param C{R};

var ilosc{r in R} >=0;

minimize price: sum{r in R} C[r] * ilosc[r];
s.t. c1: sum{r in R} ilosc[r] * Z[r], <= P;
s.t. c2: sum{r in R} ilosc[r] * W[r], >= N;
solve;
printf{r in R} "%s = %g\n", r, ilosc[r];
end;