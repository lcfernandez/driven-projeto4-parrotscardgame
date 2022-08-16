let quantity = 0;

while ((quantity < 4) || (quantity > 14) || (quantity %2 !== 0)) {
  quantity = prompt("Com quantas cartas você quer jogar?");
}