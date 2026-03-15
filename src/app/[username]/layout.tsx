import { Metadata } from 'next';
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

export async function generateMetadata({ params }: { params: { username: string } }): Promise<Metadata> {
  const username = params.username;
  
  try {
    const docRef = doc(db, 'public_profiles', username);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        title: `${data.fullName} | ${data.role} | iamfolio`,
        description: data.summary || `Explore the professional portfolio of ${data.fullName} on iamfolio.`,
        openGraph: {
          title: `${data.fullName} - ${data.role}`,
          description: data.summary,
          type: 'website',
        }
      };
    }
  } catch (err) {
    console.error("Metadata error:", err);
  }

  return {
    title: 'Professional Portfolio | iamfolio',
    description: 'View this professional profile on iamfolio.',
  };
}

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
