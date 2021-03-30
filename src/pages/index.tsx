import { NextPage } from 'next';
import Head from 'next/head';
import { FormEventHandler, useEffect, useState } from 'react';
import styles from '../styles/Home.module.css';

interface Post {
  id: string;
  text: string;
}

export const Home: NextPage = () => {
  const [text, setText] = useState('');
  const [posts, setPosts] = useState<Post[]>([]);

  const fetchPosts = async () => {
    const posts = await (await fetch('/api/posts')).json();
    setPosts(posts);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const createPost: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await fetch('/api/posts', {
      body: JSON.stringify({ text }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });
    setText('');
    fetchPosts();
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Next.js and Prisma Integration tests</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <form onSubmit={createPost}>
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            type="text"
            placeholder="What is on your mind?"
          />
          <button>Post</button>
        </form>

        <div>
          <p>Posts</p>
          <ul>
            {posts.map((post) => (
              <li key={post.id}>{post.text}</li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
};

export default Home;
