import MockFirebase from 'mock-cloud-firestore';

const fixtureData = {
  __collection__: {
    order: {
      __doc__: {
        abc123: {
          createdAt: '1 ago. 2019 18:36',
          finalDate: '1 ago. 2019 20:36',
          name: 'Rocio',
          product: 'Cafe Americano',
          state: 'En preparación'
        },
      }
    }
  }
}

global.firebase = new MockFirebase(fixtureData, { isNaiveSnapshotListenerEnabled: true });

import { readData, databaseOrder, editFirestore, filterFirestore } from '../src/firestore.js';
describe('databaseOrder', () => {
  it('Debería poder guardar una orden', (done) => {
    return databaseOrder({
      createdAt: '2 ago. 2019 18:36',
      finalDate: '2 ago. 2019 21:36',
      name: 'Pilar',
      product: 'Café con leche',
      state: 'En preparación'
    })
      .then(() => {
        const callback = (order) => {
          let result;
          order.forEach((e) => {
            if (e.data().product === 'Café con leche') {
              result = e.data()
            }
          })
          expect(result.product).toBe('Café con leche');
          done();
        }
        readData('order', 'createdAt', callback);
      })
  })
})

describe('editFirestore', () => {
  it('Debería poder editar un producto', (done) => {
    return editFirestore('abc123', {
      product: 'Jugo de frutas natural'
    })
      .then(() => {
        const callback = (order) => {
          let result
          order.forEach((e) => {
            if (e.data().product === 'Jugo de frutas natural') {
              result = e.data()
            }
          })
          expect(result.product).toBe('Jugo de frutas natural');
          done();
        }
        filterFirestore('En preparación', callback)
      })
  })
})
