const chai      = require('chai')
const should    = chai.should()
const chaiHttp  = require('chai-http')

chai.use(chaiHttp);

describe('Posting new question', () => {
      it('should store a new question to the database and return data', (done) => {
            chai.request('http://localhost:3000')
            .post('/question')
            .send({
                  title: 'Hello World!',
                  content: 'Lorem ipsum dolor sit amet',
                  vote: [],
                  answer: [],
                  author: 'Isumi',
                  slug: 'hello-world'
            })
            .end((err,res) => {
                    res.should.be.json;
                    res.should.have.status(200);
                    res.body.title.should.equal('Hello World!');
                    res.body.content.should.equal('Lorem ipsum dolor sit amet');
                    res.body.author.should.equal('Isumi');
                    res.body.slug.should.equal('hello-world');
                    done();
            })
      })
})

describe('Getting list question', () => {
      it('should show list question', (done) => {
            chai.request('http://localhost:3000')
            .get('/question')
            .end((err,res) => {
                  res.should.be.json;
                  res.should.have.status(200);
                  done();
            })
      })
})

describe('Getting a question', () => {
      let slug = 'hello-world'
      it('should show one question', (done) => {
            chai.request('http://localhost:3000')
            .get('/question/'+slug)
            .end((err,res) => {
                  res.should.be.json;
                  res.should.have.status(200);
                  done();
            })
      })
})

describe('Editing a question', () => {
      let slug = 'hello-world'
      it('should store an edited question to the database and return data', (done) => {
            chai.request('http://localhost:3000')
            .put('/question/'+slug)
            .send({
                  title: 'Hello World!',
                  content: 'Lorem ipsum dolor sit amet-amet!',
                  vote: [],
                  answer: [],
                  author: 'Isumi'
            })
            .end((err,res) => {
                  res.should.be.json;
                  res.should.have.status(200);
                  res.body.title.should.equal('Hello World!');
                  res.body.content.should.equal('Lorem ipsum dolor sit amet-amet!');
                  res.body.author.should.equal('Isumi');
                  done();
            })
      })
})

describe('Deleting a question', () => {
      let slug = 'hello-world'
      it('should delete a question from the database', (done) => {
            chai.request('http://localhost:3000')
            .delete('/question/'+slug)
            .end((err,res) => {
                    res.should.be.json;
                    res.should.have.status(200);
                    res.body.title.should.equal('Hello World!');
                    res.body.content.should.equal('Lorem ipsum dolor sit amet-amet!');
                    res.body.author.should.equal('Isumi');
                    done();
            })
      })
})
