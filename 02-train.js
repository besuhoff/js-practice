function Wagon(light) {
  this.next = null;
  this.prev = null;

  this.attach = function(sibling) {
    sibling.prev = this;
    this.next = sibling;
  };

  this.switchLightOn = function() {
    light = true;
  };

  this.switchLightOff = function() {
    light = false;
  };

  this.isLightened = function() {
    return light;
  };

  this.toString = function() {
    var next = this, result = '';

    while(next) {
      result += '[' + next.isLightened() + ']';
      next = next.next;

      if (next === this) {
        break;
      }
    }

    if (next === this) {
      result = '...' + result + '...';
    }

    return result;
  }
}

function makeTrain(length, fillValue) {
  length = length || Math.random() * 10000;

  var nextWagon = currentWagon = new Wagon(fillValue === undefined ? Math.random() >= 0.5 : fillValue);

  for (var i = 0; i < length - 1; i++) {
    var wagon = new Wagon(fillValue === undefined ? Math.random() >= 0.5 : fillValue);
    nextWagon.attach(wagon);
    nextWagon = wagon;
  }

  nextWagon.attach(currentWagon);

  return currentWagon;
}

function countWagons(startWagon) {
  var n = 1, direction = 'next', currentWagon = startWagon, ops = 0;

  startWagon.switchLightOn();

  while(true) {
    currentWagon = currentWagon[direction];
    ops++;

    while(!currentWagon.isLightened()) {
      currentWagon = currentWagon[direction];
      ops++;
      n++;
    }

    currentWagon.switchLightOff();
    direction = direction === 'next' ? 'prev': 'next';

    for(var i = n; i >= 1; i--) {
      currentWagon = currentWagon[direction];
      ops++;
    }

    if (!currentWagon.isLightened()) {
      break;
    } else {
      n = 1;
    }
  }

  console.log('Length is: ' + n + '\nTwo direction (Sergiy’s) method took ' + ops + ' operations');

  return n;
}

function countWagonsOneDirection(startWagon) {
  var n = 1, direction = 'next', currentWagon = startWagon, ops = 0;

  startWagon.switchLightOn();

  while(true) {
    currentWagon = currentWagon[direction];
    ops++;

    while(!currentWagon.isLightened()) {
      currentWagon = currentWagon[direction];
      ops++;
      n++;
    }

    currentWagon.switchLightOff();
    direction = direction === 'next' ? 'prev': 'next';

    for(var i = n; i >= 1; i--) {
      currentWagon = currentWagon[direction];
      ops++;
    }

    if (!currentWagon.isLightened()) {
      break;
    } else {
      direction = direction === 'next' ? 'prev': 'next';
      n = 1;
    }
  }

  console.log('Length is: ' + n + '\nOne direction (Pasha’s) method took ' + ops + ' operations');

  return n;
}

function assert(expression) {
  if (!expression) {
    throw 'Assertion failed';
  }

  return expression;
}

var train;

train = makeTrain(4);
assert(countWagons(train) === 4);
train = makeTrain(4);
assert(countWagonsOneDirection(train) === 4);

train = makeTrain(10);
assert(countWagons(train) === 10);
train = makeTrain(10);
assert(countWagonsOneDirection(train) === 10);

train = makeTrain(11223);
assert(countWagons(train) === 11223);
train = makeTrain(11223);
assert(countWagonsOneDirection(train) === 11223);