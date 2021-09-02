export async function getToken() {
  try {
    const fetchResult = await fetch('https://opentdb.com/api_token.php?command=request');
    const token = await fetchResult.json();
    return token;
  } catch (err) {
    console.error(err);
  }
}

export const test = 'test';
