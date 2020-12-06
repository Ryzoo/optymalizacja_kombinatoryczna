param k, integer, > 0;
param n, integer, > 0;
param odl{1..n, 1..n};

var wybor{1..n}, binary;

s.t. c1: sum{x in 1..n} wybor[x] == 3;

maximize dest: sum{x in 1..(n-1), y in (x+1)..n} if wybor[x] + wybor[y] >= 2 then odl[x, y] else 10;

solve;
display wybor;
printf{x in 1..n:wybor[x] == 1} "%s\n", x;
end;