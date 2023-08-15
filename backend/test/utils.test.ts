import test from 'ava';
import {normalizeEmail} from '../src/utils';

test('should return a lowercase email always', t => {
  t.is(normalizeEmail('test@test.com'), 'test@test.com');
  t.is(normalizeEmail('tEst@test.com'), 'test@test.com');
  t.is(normalizeEmail('TEST@test.com'), 'test@test.com');
  t.is(normalizeEmail('tesT@test.com'), 'test@test.com');
});

test('should not care about dot in a email', t => {
  t.is(normalizeEmail('t.e.s.t@test.com'), 'test@test.com');
  t.is(normalizeEmail('tE.st@test.com'), 'test@test.com');
  t.is(normalizeEmail('T.EST@test.com'), 'test@test.com');
  t.is(normalizeEmail('tes.T@test.com'), 'test@test.com');
});

test('should not care about the string after the plus in a email', t => {
  t.is(normalizeEmail('t.es.t+@test.com'), 'test@test.com');
  t.is(normalizeEmail('tE.st+123.test@test.com'), 'test@test.com');
  t.is(normalizeEmail('T.E+ST@test.com'), 'te@test.com');
  t.is(normalizeEmail('tes.T+1@test.com'), 'test@test.com');
  t.is(normalizeEmail('tes.T+1+tes.t@test.com'), 'test@test.com');
});

test('should throw an error if the email is invalid', t => {
  t.throws(() => normalizeEmail('test'), {
    message: 'Invalid email: test',
  });
});
