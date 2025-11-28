
import * as cdk from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';

interface Ec2StackProps extends cdk.StackProps {
  vpc: ec2.IVpc;
}

export class Ec2Stack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props: Ec2StackProps) {
    super(scope, id, props);

    new ec2.Instance(this, 'MyInstance', {
      vpc: props.vpc,
      instanceType: ec2.InstanceType.of(ec2.InstanceClass.T3, ec2.InstanceSize.MICRO),
      machineImage: ec2.MachineImage.latestAmazonLinux(),
    });
  }
}
