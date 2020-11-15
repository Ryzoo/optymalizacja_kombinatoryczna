param X;
param Y;
param Z;

var kfA >= 0;
var kfB >= 0;
var kl >= 0;
maximize obj: 0.09 * kfA + 0.11 * kfB + 0.1 * kl;
s.t. c1: kfA + kfB <= X/2;
s.t. c2: kfB <= Y;
s.t. c3: kl >= Z;
s.t. c4: kfA + kfB + kl = X;
solve;
printf "%.2f \n", obj;
end;