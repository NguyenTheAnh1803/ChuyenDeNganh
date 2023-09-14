function Node(coefficient, exponent) {
  this.coefficient = coefficient;
  this.exponent = exponent;
  this.next = null;
}

function Polynomial() {
  this.head = null;

  this.insertTerm = function (coefficient, exponent) {
    const newNode = new Node(coefficient, exponent);
    if (!this.head) {
      this.head = newNode;
    } else {
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = newNode;
    }
  };
}

function addPolynomials() {
  const poly1Input = document.getElementById("poly1").value;
  const poly2Input = document.getElementById("poly2").value;

  const poly1Terms = parsePolynomial(poly1Input);
  const poly2Terms = parsePolynomial(poly2Input);

  const resultPoly = new Polynomial();

  let current1 = poly1Terms.head;
  let current2 = poly2Terms.head;

  while (current1 && current2) {
    if (current1.exponent === current2.exponent) {
      resultPoly.insertTerm(
        current1.coefficient + current2.coefficient,
        current1.exponent
      );
      current1 = current1.next;
      current2 = current2.next;
    } else if (current1.exponent > current2.exponent) {
      resultPoly.insertTerm(current1.coefficient, current1.exponent);
      current1 = current1.next;
    } else {
      resultPoly.insertTerm(current2.coefficient, current2.exponent);
      current2 = current2.next;
    }
  }

  while (current1) {
    resultPoly.insertTerm(current1.coefficient, current1.exponent);
    current1 = current1.next;
  }

  while (current2) {
    resultPoly.insertTerm(current2.coefficient, current2.exponent);
    current2 = current2.next;
  }

  displayPolynomial(resultPoly);
}

function parsePolynomial(input) {
  const terms = new Polynomial();
  const termStrings = input.split("+");
  for (const termString of termStrings) {
    const [coefficient, exponent] = parseTerm(termString.trim());
    terms.insertTerm(coefficient, exponent);
  }
  return terms;
}

function parseTerm(termString) {
  const parts = termString.split("x^");
  console.log(parts);
  if (parts.length === 2) {
    const coefficient = parseInt(parts[0]);
    const exponent = parseInt(parts[1]);
    return [coefficient, exponent];
  }
  return [parseInt(parts[0]), 0];
}

function displayPolynomial(polynomial) {
  let current = polynomial.head;
  let resultString = "";

  console.log(current);

  while (current) {
    if (current.exponent === 0) {
      resultString += `${current.coefficient}`;
    } else if (current.exponent === 1) {
      resultString += `${current.coefficient}x`;
    } else {
      resultString += `${current.coefficient}x^${current.exponent}`;
    }

    current = current.next;
    if (current) {
      resultString += " + ";
    }
  }

  const resultElement = document.getElementById("result");
  resultElement.textContent = resultString;
}
