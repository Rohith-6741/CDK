#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib/core';
import { CloudWatchForExistingEC2Stack } from '../lib/cloudwatch-stack';

const app = new cdk.App();
new CloudWatchForExistingEC2Stack(app, 'CloudwatchStack', {
 
});
