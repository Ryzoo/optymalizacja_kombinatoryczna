param k;
param n;
param odl{1..n, 1..n};

var wybor{i in 1..n}, binary;

maximize odleglosc: min{m in 1..k} wybor[m];
solve;
display wybor;
end;