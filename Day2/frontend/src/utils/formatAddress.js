function formatAddress(address) {
    if(address) {
      return (
        address.slice(0, 6) + '...' + address.slice(-4, )
      );
    }
    return '';
  }
  
  export { formatAddress };