param maxX,integer,>0,<=90;

set edgesArray := {0..maxX-1};
set edges dimen 2;

var x{edgesArray},binary;

minimize v: sum{i in edgesArray} x[i];
s.t. z1{(i,j) in edges}: x[i] + x[j] >= 1;
solve;

printf "\nCount: %s\n\n", v;

end;