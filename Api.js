export async function fetchProducts(){
      try{
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();
        return data.map(product => ({
          image: product.image,
          id: product.id,
          title: product.title,
          price: product.price,
          rating: product.rating,
          category: product.category
        }));
      } catch (error) {
        console.log('Error fetching products', error)
        throw error;
      }
    }