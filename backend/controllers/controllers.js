import bcrypt from 'bcryptjs';
import { generateToken } from '../utils.js';
import { MongoClient, ObjectId } from 'mongodb';
const uri =
  'mongodb+srv://abaynehmichael:mg330927@cluster0.rdvomzg.mongodb.net/CS-566';
let client = new MongoClient(uri);
let db = null;
async function main() {
  await client.connect();
  db = client.db('CS-566');
}
export const run = () => {
  main()
    .then(console.log('DB connected'))
    .catch((err) => console.log(err));
};

const COLLECTION_USERS = 'users';
const COLLECTION_PRODUCTS = 'products';

export const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await db.collection(COLLECTION_USERS).findOne({ email });
    if (!user) {
      return res.send('Please check your email.');
    }
    if (!bcrypt.compareSync(password, user.password)) {
      return res.send('Please check your password.');
    }
    console.log('************************');
    return res.send({
      _id: user._id,
      name: user.name,
      email: user.email,
      password: user.password,
      isAdmin: user.isAdmin,
      token: generateToken(user),
    });
  } catch (error) {
    console.log(error);
    next(new Error('Unable to create token.'));
  }
};

export const signup = async (req, res, next) => {
  const { name, email, password } = req.body;
  const hashed = bcrypt.hashSync(password, 2);

  const user = await db
    .collection(COLLECTION_USERS)
    .insertOne({ name, email, password: hashed, isAdmin: false });

  res.send({ success: true, data: 'User created successfully' });
};

//****************************************************************************** */
export const getProducts = async (req, res) => {
  const products = await db.collection(COLLECTION_PRODUCTS).find({}).toArray();
  res.send(products);
};

export const addProducts = async (req, res) => {
  try {
    const products = await db
      .collection(COLLECTION_PRODUCTS)
      .insertOne(req.body);
    res.send({ success: true, data: products });
  } catch (error) {
    res.send(error);
  }
};

export const getSlug = async (req, res) => {
  try {
    const product = await db
      .collection(COLLECTION_PRODUCTS)
      .findOne({ slug: req.params.slug });
    if (product) {
      res.send(product);
    } else {
      res.send({ message: 'Product not found' });
    }
  } catch (err) {
    console.error(err);
    res.send({ message: 'Error finding product' });
  }
};

export const getById = async (req, res) => {
  const id = new ObjectId(req.params.id);
  const product = await db.collection(COLLECTION_PRODUCTS).findOne(id);
  if (product) {
    res.send(product);
  } else {
    res.send({ message: 'product not found' });
  }
};

export const updateProduct = async (req, res) => {
  const id = new ObjectId(req.params.id);
  const product = await db
    .collection(COLLECTION_PRODUCTS)
    .updateOne({ _id: id }, { $set: req.body });
  if (product) {
    res.send(product);
  } else {
    res.send({ message: 'product not found' });
  }
};

export const deleteProduct = async (req, res) => {
  const id = new ObjectId(req.params.id);
  const product = await db
    .collection(COLLECTION_PRODUCTS)
    .deleteOne({ _id: id });
  if (product) {
    res.send(product);
  } else {
    res.send({ message: 'product not found' });
  }
};

//**************************************************************88 */

export const validateEmail = async (req, res, next) => {
  try {
    const email = req.body.email;
    const user = await db
      .collection(COLLECTION_USERS)
      .find({ email })
      .toArray();
    for (let each of user) {
      if (email === each.email) {
        return res.send({
          success: false,
          data: `${email} ${' is duplicate.'}`,
        });
      }
    }
    next();
  } catch (error) {
    next(new Error(error));
  }
};

export const validateSlug = async (req, res, next) => {
  try {
    const slug = req.body.slug;

    const product = await db
      .collection(COLLECTION_PRODUCTS)
      .find({ slug })
      .toArray();
    for (let each of product) {
      if (slug === each.slug) {
        return res.send({
          success: false,
          data: `${slug} ${' is duplicate.'}`,
        });
      }
    }
    next();
  } catch (error) {
    next(new Error(error));
  }
};

export const updateRating = async (req, res) => {
  const slug = req.params.slug;
  const newRate = req.body.rating;
  console.log(slug, newRate);
  const product = await db
    .collection(COLLECTION_PRODUCTS)
    .updateOne({ slug }, { $push: { rating: newRate } });
  if (product) {
    res.send(product);
  } else {
    res.send({ message: 'product not found' });
  }
};

//******************************************************************** */

// export const orderItems1 = async (req, res, next) => {
//   const order = new Order({
//     orderItems: req.body.orderItems.map((x) => ({ ...x, product: x._id })),
//     shippingAddress: req.body.shippingAddress,
//     paymentMethod: req.body.paymentMethod,
//     itemPrice: req.body.cartItems,
//     shipppingPrice: req.body.shipppingPrice,
//     taxPrice: req.body.taxPrice,
//     totalPrice: req.body.totalPrice,
//     user: req.user._id,
//   });
// };

// export const orderItems3 = async (req, res) => {
//   const order = await Order.findById(req.params.id);
//   if (order) {
//     order.isPaid = true;
//     order.paidAt = Date.now();
//     order.paymentResult = {
//       id: req.body.id,
//       status: req.body.status,
//       update_time: req.body.update_time,
//       email_address: req.body.email_address,
//     };

//     const updatedOrder = await order.save();
//     res.send({ message: 'Order Paid', order: updatedOrder });
//   } else {
//     res.status(404).send({ message: 'Order Not Found' });
//   }
// };
