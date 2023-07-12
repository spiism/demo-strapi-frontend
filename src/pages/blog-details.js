import React from 'react';
import { useQuery, gql } from '@apollo/client'
import { useRouter } from 'next/router';

//Create the query
const BLOG = gql`
query GetBlog($id: ID!) {
        blog(id: $id) {
          data {
            id
            attributes {
              Title
              Body
              Author
            }
          }
        }
}
`

export default function BlogDetails() {
    //Get the id from the URL
    const router = useRouter();
    const { id } = router.query;

    console.log(id)

    //Pass variables to the query and execute it. Store the results in an object
    const { loading, error, data } = useQuery(BLOG, {
        variables: { id: id }
      })

    //Display messages accordingly
      if (loading) return <p>Loading...</p>
      if (error) return <p>Error :(</p>
    
      console.log(data)

  return (
    <div className='mt-2 mb-2 p-4 bg-white rounded-md'>
        <div className='text-2xl'>
            {data.blog.data.attributes.Title}
        </div>

        <div className='mt-2 mb-2'>
            {data.blog.data.attributes.Body}
        </div>

        <div className=''>
            <p className='text-purple-500'>Blog Author: {data.blog.data.attributes.Author}</p>
        </div>
    </div>
  );
}