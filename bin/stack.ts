import * as cdk from 'aws-cdk-lib';
import { VpcStack } from '../lib/stack-stack';
import { S3Stack } from '../lib/s3';
import { Ec2Stack } from '../lib/ec2';
import { AlbStack } from '../lib/alb';
import { AsgStack } from '../lib/as';

const app = new cdk.App();

const vpcStack = new VpcStack(app, 'VpcStack');
new S3Stack(app, 'S3Stack');

const ec2Stack = new Ec2Stack(app, 'Ec2Stack', { vpc: vpcStack.vpc });
const albStack = new AlbStack(app, 'AlbStack', { vpc: vpcStack.vpc });
const asgStack = new AsgStack(app, 'AsgStack', { vpc: vpcStack.vpc, listener: albStack.listener });

ec2Stack.addDependency(vpcStack);
albStack.addDependency(vpcStack);
