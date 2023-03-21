import React from 'react';
import * as API from 'src/api';
export default function MessagePage() {
  React.useEffect(() => {
    async function getAuth() {
      const res = await API.getAuth();
      console.log(res);
    }

    getAuth();
  }, []);

  return <div>MessagePage</div>;
}
