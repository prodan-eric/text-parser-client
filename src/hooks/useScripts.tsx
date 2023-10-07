import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { ClientScript } from '../types';
import getScripts from '../api/get-scripts';

function useScripts(id?: string):  [ClientScript[], Dispatch<SetStateAction<ClientScript[]>>] {
  const [scripts, setScripts] = useState<ClientScript[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (id !== undefined) {
        try {
          const fetchedScripts = await getScripts(id);
          setScripts(fetchedScripts);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      } else {
        setScripts([]);
      }
    };

    fetchData(); 
  }, [id]);

  return [scripts, setScripts];
}

export default useScripts;
