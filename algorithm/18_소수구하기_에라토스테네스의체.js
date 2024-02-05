function get_primes(num) {
  const prime = [false, false, ...Array(num - 1).fill(true)];

  for (let i = 2; i * i <= num; i += 1) {
    if (prime[i]) {
      for (let j = i * 2; j <= num; j += 1) {
        prime[j] = false;
      }
    }
  }
  return prime.filter(Boolean);
}
