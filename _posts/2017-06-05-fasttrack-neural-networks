---
title: Fastrack to Neural Networks
updated: 2017-06-05 8:46
---
#Fastrack to Neural Networks
Neural Networks

	A coarse model of actual synapse and neural system in a living organism. 
	In this model , me use static weights and use simple multiplication on the neuron, but in actual neural system, this is dynamic and does complex computations in the inputs.

	Types of classifiers : 
		1. Binary softmax
		2. Binary SVM
	Types of activation functions used:
		1. sigmoid 
		2. tanh -- a scaled version of sigmoid 
		3. ReLU -- Rectified Linear Unit -- does f(x)=max(0,x) -- greatly accelerates convergence of SGD -- less expensive computations compared to sigmoid or tanh 
		4. Leaky ReLU -- uses a small value instead of 0 for values of x <= 0 -- corrects the problem of dying out ReLU
		5. maxout -- uses  max(w1 * x + b1,w_2 *x + b2) -- completely solves dying out problem and has all the (+) of reLU

		Never use sigmoid. Use ReLU or maxout.

	Neural Nw Architectures

	things are acyclic. output of one cannot cycle, which may lead to infinite looping. 

	you can always organise them as amorphous blobs. but its better to organise them into layers.



	Representational Power

		A Neural network with single layer of activation can represent any mathematical function

		Then why use more layers and go deeper ? 
		The fact that deeper neural networks can do the job better than a single layered one is an empirical observation, despite the fact that their representational power is equal.

		For a normal NN, going deeper than 2 layers wont make much difference in their performance. 
		But this is not the case for a CNN, where depth is an important factor which decides performance and quality.

	Setting the number of Layers and their size

		NNs with more number of neurons can give good performance. But this can also lead to the problem of overfitting.

		Takeaway is we shouldn't use smaller networks fearing over fitting. Rather, we should use regularization techniques for solving the overfitting problem. The factor that limits chosing no. of layers should be our computational power available.

		(L2 regularization, dropout, input noise)


Getting things ready for training 


	Data Preprocessing

		1. Mean substraction
			substracting mean value from each pixel
		2. Normalization
			dividing the set with its standard deviation once its zero-centered.
		3. PCA Principle Component Analysis
			this is all about reducing the original training set to a much simpler set which has the features which 'matters' most.
			this features which matters the most are sorted out using the covariance matrix of the parent set. 
			the eigen vectors U of covariance matrix is found. U will be sorted on the basis of their eigenvalues.
			thus on multiplying parent set with the first N values in U, we end up with the N data values which has the highest value of variance. 
			A  U vectors has to be rotated and multiplied with X to decorrelate, or display the correlated thing in images.
		4. Whitening 
			taking data in eigen basis and divides with the eigen values to normalize it.

	Recommendations for Initializing weights

		1. Pitfall: all zero initialization.
		2. Use Small random numbers
			its recommended to look like W = 0.01* np.random.randn(D,H), where randn samples from a zero mean, unit standard deviation gaussian.
			The init values of W has to be closer to zero, but shouldn't be exactly zero. And it shouldn't have symmetry.
			Warning: It’s not necessarily the case that smaller numbers will work strictly better
		3. Calibrating the variances with 1/sqrt(n)
		4. Sparse initialization
		5. Initializing the biases
		6. Batch Normalization
			forces activations of each layer to take on a unit gaussian distribution. 
			applying this technique involves using inseting BatchNorm layer immediately after fully connected layers.
			before non-linearities. used in practice for CNNs
			can be interpreted as doing preprocessing at every layer of the network, but integrated into the network itself in a differentiable manner
		In practice, the current recommendation is to use ReLU units and use the w = np.random.randn(n) * sqrt(2.0/n).

	Regularization techniques

		1. L2 regularization
			for every term in the network, we adds 0.5  * w^2 * lambda 
			as the intuition of heavily penalizing the peaky weight vectors and preferring the diffused ones.
		2. L1 regularization
		3. combination of L1 and L2
		4. dropout 
			instead in using all the nodes in all the layers, dropouts focus on considering only a number of the nodes ,with the probability of selecting a node being 'p', and others set to zero.
			from the dropout paper :
			The key idea is to randomly drop units (along with their connections) from the neural
			network during training
			This prevents units from co-adapting too much
		5. Regularizing bias -- dont make much difference on the results.

		In practice, its suggested to do dropout with p = 0.5 by default. But still, some kind of tuning can be done on p based on the data set.

	Cost/ Loss functions 

		1. softmax
		2. SVM 
		In case of large set of Classes:
		3. hierarchichal softmax
		Attribute classification:
		4. binary classfier
		5. logistic regression classifier

		In practice, When faced with a regression task, first consider if it is absolutely necessary. Instead, have a strong preference to discretizing your outputs to bins and perform classification over them whenever possible.!

Dynamics - process of finding good hyperparameters

	Making sure you're getting right

		1. use the centered formula for numerical gradient 
		2. use relative error deltaX/X for comparison of numerical and analytical gradients. define a specific threshold range to keep in the limits.
		3. use double precision
		4. better stick around the active range of floating point numbers.
		5. watchout for kinks - non differentiable points in an objective function. at these points, analytical thing would be giving zero derivative, but the numerical gradient thing would give non zero output leading to errors.
		6. Don't let the regularization overwhelm the data. where, gradients will be mostly coming from regularizations rather than data . its advised to turn off regularization contribution and see only the contribution of data loss. 
		7. turn off dropouts while performing gradient checks.
		8. Don't check gradient for all parameters simultaneously.

		checking the ratio of weights 
		ratio of updated magnitudes to value magnitudes. a rough heuristic is that this ratio should be somewhere around 1e-3.
		if its lower than this, learning rate might be low.
		if its higher, learning rate should be high.


	parameter update methods

		once gradient is found using back propogation, parameter updates have to be made.

			1. vanilla updates
			2. momentum update
			3. Nestorov momentum
			4. second order update , or Newton's method. using inverse hessian multiplication. computationally very intensive.
			much less intensive implementation is L-BFGS.

		In practice,  SGD variants based on (Nesterov’s) momentum are more standard because they are simpler and scale more easily.

		annealing learning  rates
			1. step decay
			2. exponential decay
			3. 1/t decay
			step decay is preferred. difficult to interpret the rest. 

		Other adaptive learning techniques : 
			1. Adagrad
			2. RMSprop
			3. Adam


		hyperparams to be taken care

			1. initial learning rate
			2. learning rate decay schedula
			3. regularization strength (L2 penalty, dropout strength) 

			less sensitive hyperparams - momentum constant

			hyperparameter ranges 

			learning rate parameters should be tried from a range in log scale.
			dropout params could be tried on a uniform scale.

			! be careful with the values on the border of the hyperparameter range

			narrow your range based on where the results are getting good. 

			Bayesian hyperparameter optimization is emerging , but for ConvNets and all, nothing have beaten the results of a random search on a well curated range.



Convolutional Neural Networks

makes the explicit assumtion that the inputs are images, which allows to encode certain properties into the architecture. making forward function more efficient to implement and vastly reduce the amount of parameters in the network.

