import React from 'react';
import { useQuery, gql } from '@apollo/client'
import Link from 'next/link';

//GraphQL query to fetch all the blogs from the backend
const BLOGS = gql`
{
    blogs {
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

export default function Homepage() {

//Execute the query using the useQuery hook and store the return values.
const { loading, error, data } = useQuery(BLOGS)

//Display the following when fetching
if (loading) return <p>Loading...</p>
//Display the following in case an error is encountered
if (error) return <p>Error :(</p>
//log the data to the console
console.log(data)
  return (
      <div>
      {/* Map through the data */}
          {
            data.blogs.data.map(blog => (
                <div key={blog.id} className='mt-2 mb-2 p-4 bg-white rounded-md'>
                    <div className='text-xl'>
                        {blog.attributes.Title}
                    </div>

                    <small>
                        {blog.attributes.Author}
                    </small>

                    {/* Display only the first 150 characters of the body */}
                    <div>
                        {blog.attributes.Body.substring(0,150)}...
                    </div>

                    {/* Link to display the whole blog content */}
                    <Link href={{ pathname: '/blog-details', query: { id: blog.id } }}>
            <p className="text-purple-600">Read more...</p>
          </Link>
                </div>
            ))
          }
      </div>
  );
}