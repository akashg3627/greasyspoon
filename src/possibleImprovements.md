## Improvements needed in the backend:

1. Make it uniform (send data with `res.status().json()`)
2. add food description
3. add cafe descriptionadd support for upload of  food image
4. decomplex the models 
5. add validation
6. learn populate

```javascript
const superagent = require('superagent');
 
// callback
superagent
  .post('/api/pet')
  .send({ name: 'Manny', species: 'cat' }) // sends a JSON post body
  .set('X-API-Key', 'foobar')
  .set('accept', 'json')
  .end((err, res) => {
    // Calling the end function will send the request
  });
 
// promise with then/catch
superagent.post('/api/pet').then(console.log).catch(console.error);
 
// promise with async/await
(async () => {
  try {
    const res = await superagent.post('/api/pet');
    console.log(res);
  } catch (err) {
    console.error(err);
  }
})();
```



## notes

``` javascript
const courses = await Course
.find({ author: ‘Mosh’, isPublished: true })
.skip(10)
.limit(10)
.sort({ name: 1, price: -1 })//1 ascending 2 descending
.select({ name: 1, price: 1 });//1 include -1 not include
```

![image-20200818160833031](C:\Users\Dipin Garg\AppData\Roaming\Typora\typora-user-images\image-20200818160833031.png)

```javascript
const courses = await Course
.find({ price:
       {$gte:10,$lte:20}
      //{$in:[10,15,20]} if we want price to be 10 or 15 or 20
      })//for price >= 10 & <=20
.skip(10)
.limit(10)
.sort({ name: 1, price: -1 })//1 ascending 2 descending
.select({ name: 1, price: 1 });//1 include -1 not include
```

### Logical Operators

Suppose we want an all the courses by mosh **OR** not published then we use  - 

```javascript
const courses = await Course
.find()
.or({ author: ‘Mosh’}, {isPublished: true })
```

Suppose we want an all the courses by mosh **AND** not published then we use  - 

```javascript
const courses = await Course
.find()
.and({ author: ‘Mosh’}, {isPublished: true })
```

## Updating a document

``` javascript
const course = await Course.findById(id);
course.set({ name: ‘…’ });
course.save();
```

or

```javascript
const course = await Course.findById(id);

course.name='...'
course.save();
```

## Validation

```javascript
await document.save() //triggers validation
await document.validate() //also triggers validation //returns void promise
```

