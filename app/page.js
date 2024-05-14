import Feed from '../components/Feed'

const Home = () => (
  <section className='w-full flex-center flex-col'>
    <h1 className='head_text text-center'>
      Discover and Share
      <br className='max-md:hidden' />
      <span className='orange_gradient text-center'>Connect with Blogs and Tweets!</span>
    </h1>
    <p className='desc text-center'>
      Twizzle is your go-to platform for sharing, discovering, and connecting through tweets. Join our vibrant community today!
    </p>
    <Feed />
  </section>
);

export default Home;
