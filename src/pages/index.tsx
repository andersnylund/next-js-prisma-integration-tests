import { InferGetServerSidePropsType, NextPage } from 'next';
import Head from 'next/head';
import { FormEventHandler, useState } from 'react';
import styles from '../styles/Home.module.css';

interface Post {
  id: string;
  text: string;
}

const fetchPosts = async (): Promise<Post[]> => {
  return await (await fetch('http://localhost:3000/api/posts')).json();
};

const Index: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ posts: serverPosts }) => {
  const [text, setText] = useState('');
  const [posts, setPosts] = useState<Post[]>(serverPosts);

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
    const posts = await fetchPosts();
    setPosts(posts);
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

export const getServerSideProps = async (): Promise<{
  props: {
    posts: Post[];
  };
}> => {
  const posts: Post[] = await fetchPosts();
  return {
    props: {
      posts,
    },
  };
};

export default Index;
