const request = require('supertest');
const app = require('../server');

describe('Modify Tests', () => {
  afterEach(async () => request(app).delete('/api/to-dos'));

  it('GET /api/to-dos serves empty array if no "to dos"', async () => {
    const res = await request(app).get('/api/to-dos')

    expect(res.status).toEqual(200);
    expect(res.body).toEqual([]);
  });

  it('GET /api/to-dos sees all "to dos"', async () => {
    const toDoTitle1 = 'Create the first "to do"';
    const toDoTitle2 = 'Create the second "to do"';
    await request(app)
      .post('/api/to-dos')
      .send({ title: toDoTitle1 })
      .set('Accept', 'application/json')

    await request(app)
      .post('/api/to-dos')
      .send({ title: toDoTitle2 })
      .set('Accept', 'application/json')

    const res = await request(app).get('/api/to-dos')

    const [toDo1, toDo2] = res.body;

    expect(res.status).toEqual(200);
    expect(toDo1.id).toBeGreaterThan(0);
    expect(toDo1.title).toBe(toDoTitle1);
    expect(toDo1.isDone).toBe(false);
    expect(toDo2.id).toBeGreaterThan(0);
    expect(toDo2.title).toBe(toDoTitle2);
    expect(toDo2.isDone).toBe(false);
  });

  it('POST /api/to-dos creates a "to do"', async () => {
    const toDoTitle = 'Create a "to do"';
    const res = await request(app)
      .post('/api/to-dos')
      .send({ title: toDoTitle })
      .set('Accept', 'application/json')

    expect(res.status).toEqual(201);
    const { id, title, isDone } = res.body;
    expect(id).toBeGreaterThan(0);
    expect(title).toBe(toDoTitle);
    expect(isDone).toBe(false);
  });

  it('PATCH /api/to-dos/:id updates a "to do"', async () => {
    const toDoTitle = 'Go to the store';
    const createRes = await request(app)
      .post('/api/to-dos')
      .send({ title: toDoTitle })
      .set('Accept', 'application/json')

    const { id } = createRes.body;

    const updateRes1 = await request(app)
      .patch(`/api/to-dos/${id}`)
      .send({ isDone: true });

    expect(updateRes1.status).toEqual(200);
    expect(updateRes1.body.id).toBe(id);
    expect(updateRes1.body.title).toBe(toDoTitle);
    expect(updateRes1.body.isDone).toBe(true);

    const updateRes2 = await request(app)
      .patch(`/api/to-dos/${id}`)
      .send({ isDone: false });

    expect(updateRes2.status).toEqual(200);
    expect(updateRes2.body.id).toBe(id);
    expect(updateRes2.body.title).toBe(toDoTitle);
    expect(updateRes2.body.isDone).toBe(false);
  });

  it('PATCH /api/to-dos/:id returns 404 if a "to do" does not exist', async () => {
    const updateRes = await request(app)
      .patch('/api/to-dos/100')
      .send({ isDone: true });

    expect(updateRes.status).toEqual(404);
    expect(updateRes.body).toEqual({});
  });

  it('DELETE /api/to-dos/:id deletes an existing "to do"', async () => {
    const toDoTitle = 'Go to the store';
    const createRes = await request(app)
      .post('/api/to-dos')
      .send({ title: toDoTitle })
      .set('Accept', 'application/json')

    const { id } = createRes.body;

    const deleteRes = await request(app).delete(`/api/to-dos/${id}`);

    expect(deleteRes.status).toEqual(204);
    expect(deleteRes.body).toEqual({});
  });

  it('DELETE /api/to-dos/:id returns 404 if a "to do" does not exist', async () => {
    const updateRes = await request(app)
      .delete('/api/to-dos/100')

    expect(updateRes.status).toEqual(404);
    expect(updateRes.body).toEqual({});
  });

  it('DELETE /api/to-dos deletes all "to dos"', async () => {
    const toDoTitle1 = 'Create the first "to do"';
    const toDoTitle2 = 'Create the second "to do"';
    await request(app)
      .post('/api/to-dos')
      .send({ title: toDoTitle1 })
      .set('Accept', 'application/json')

    await request(app)
      .post('/api/to-dos')
      .send({ title: toDoTitle2 })
      .set('Accept', 'application/json')

    const deleteRes = await request(app).delete('/api/to-dos');

    expect(deleteRes.status).toEqual(204);
    expect(deleteRes.body).toEqual({});
  });

  it('DELETE /api/to-dos 404 if there were no "to dos"', async () => {
    const updateRes = await request(app)
      .delete('/api/to-dos')

    expect(updateRes.status).toEqual(404);
    expect(updateRes.body).toEqual({});
  });
});