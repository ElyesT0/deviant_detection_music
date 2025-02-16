//Array with sequences expressions
const geometry_sequences_txt = ["12345654321"];
const geometry_sequences = geometry_sequences_txt.map(function (x) {
  return x.split("").map(Number);
});
const sequence_train_test = geometry_sequences;
