import React from 'react';
import styles from "../styles/card.module.css";
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]/route';
import Logout from "../components/Logout";
import Image from 'next/image';

const Home = async () => {
  const session = await getServerSession(authOptions);
  return (
    <div className={styles.shahed}>
      <h5>Hello , {session?.user?.name}</h5>
      <h5>Phone , {session?.user?.phone_number}</h5>

      {/* <Image src={session?.user?.image} width={100} height={100} className='rounded-lg' alt={session?.user?.name} /> */}
      <Logout />
    </div>
  );
};

export default Home;