---
title: Training a Deep Network for detecting traffic signs.
updated: 2017-7-11 15:02
---

## Training a Deep Learning Network for detecting Traffic signs. 

<div class='divider'> </div>

Well, I assume you are comfortable with installing software in an Ubuntu system. So, you can start with installing the below dependencies :

1. [Tensorflow](https://www.tensorflow.org/install/install_linux) ( CPU or GPU version depending , and also depenging on what version of python you use, install it appropriately from tensorflow website. )
2. [labelImg](https://github.com/tzutalin/labelImg) - for annotating and preparing your dataset for training. 
3. [Tensorflow Object Detection API](https://github.com/tensorflow/models/tree/master/object_detection) - Clone this repo, we will be doing the training using this nice API here. 
## How we're gonna proceed
If you've cloned labelImg, checkout how it works, it's really cool. It can basically output your annotated images in the format of PASCAL dataset.

Now, there is an important decision you've to make. The number of classes with which you're going to train. Then you've to use a code in the Detection API to convert the images and annotations
to tfrecords ( a readily accessible format for the Tensorflow training API ).
If you're done with the previous, then you can say you're done with Data part.

Now, you have to select a model to train with. You can find plenty of pretrained checkpoints in the Object detection API repo model zoo. 
You can select SSD on MobileNet, SSD on Inception, or FasterRCNN with some model, which is infact slower. Whatever depending how good a GPU you have. 

Now, after selecting the model you have to generate some files supporting the dataset, for training. 
1. label_map.pbtxt
2. pipeline .config  file 

Now, you're all set to train. On your marks.. You have tfrecords, config file, pbtxt label file, and initial checkpoints. You're ready. Train well. 

After training, you'll get the checkpoint file, now you got to generate a Frozen inference Graph file for live testing of the same on images. 
You have to use this file export_inference_graph.py in the object_detection folder for that.

Don't worry if you didn't get something , we can go detailed into each part of it in the following sections. 

Ah, you can parallely follow this tutorial [here](https://github.com/tensorflow/models/blob/master/object_detection/g3doc/running_pets.md) of training a pets dataset , in Tensorflow Object detection API thing.
Its really similar, and you can follow that if you feel like something is not clear. 

## Let's prepare the dataset ! 

We need the dataset to be in the following format. 
```
- data
  +images
  -annotations
    +xmls
    -trainval.txt
```

Images should be there in that Images folder ( yes! for every class there, all mixed ). 

Annotation xmls should be there in the xmls folder.

And trainval.txt should have the names of all the images we are training , one in a line , without extension.

You can probably use some python script for generating the list file.

### Making tfrecords

Start from this file create_pet_tf_record.py, modify it and make one for your own dataset. 

You'll have to select what percent of the total set you're keeping for training, and what proportion for validation. 

It will basically create two files some_train.record and some_val.record each for training and validation respectively.

You will also have to do a bit of modification of code in the functions get_class_name_from_filename() and dict_to_tf_example() according to your requirement.

## Getting config file and pbtxt file ready.

You've to make a config file , get one from the examples folder within object_detection. Find the one for your chosen model - 
you would've selected a network model before, edit that file. Modify num classes, play around with learning rate, you can do all that here in this file. 
You also should update the link to checkpoint and tf records. 

pbtxt, the class label file, make it seeing the example file in data folder within object_detection folder.

## Training 

You have work, with the cloned directory as the root directory.( the folder in which the folder object_detection is present )

The command for training should be like this :

```
python object_detection/train.py \
    --logtostderr \
    --pipeline_config_path=${PATH_TO_YOUR_PIPELINE_CONFIG} \
    --train_dir=${PATH_TO_TRAIN_DIR}
```

## Generating frozen inference graph after training

usage : 

```
python export_inference_graph \
    --input_type image_tensor \
    --pipeline_config_path path/to/ssd_inception_v2.config \
    --checkpoint_path path/to/model-ckpt \
    --inference_graph_path path/to/inference_graph.pb

```

input_type image_tensor is common . 

pipeline_config_path is the path to your config file.

checkpoint_path is the path to your model checkpoint ckpt file.

inference_graph_path is the output file. 

## Running inference post generating inference graph

Use the code run_detection_onFilesIndesktop.py for running test on images.
You can put all the images in a folder. It will read and produce output for all images in the folder output/

Use the code run_detection_onVideoInDesktop.py for running the test in a video. Don't forget to specify the paths of input and output files.


