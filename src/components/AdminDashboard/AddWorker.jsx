const handleAddWorker = async (workerData) => {
    try {
      // Fetch existing workers
      const response = await fetch('/workers.json');
      const data = await response.json();
      const workers = data.workers || [];
  
      // Check if email already exists
      const emailExists = workers.some(worker => worker.email === workerData.email);
      if (emailExists) {
        throw new Error('Email already registered');
      }
  
      // Create new worker object
      const newWorker = {
        id: `W${String(workers.length + 1).padStart(3, '0')}`, // Generate ID like W001
        email: workerData.email,
        password: workerData.password, // In real app, hash this!
        name: workerData.name,
        role: workerData.role,
        department: workerData.department,
        mobile: workerData.mobile,
        joinDate: new Date().toISOString().split('T')[0]
      };
  
      // Add new worker to array
      workers.push(newWorker);
  
      // In a real application, you would make an API call here
      console.log('New worker added:', newWorker);
  
      return newWorker;
  
    } catch (error) {
      console.error('Error adding worker:', error);
      throw error;
    }
  };