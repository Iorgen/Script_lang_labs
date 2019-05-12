#!/usr/bin/perl
open(INPUT_FILE, "< access.log");
%ip_list = ();
while ($line = <INPUT_FILE>) {
    if ($line =~ m/(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})/) {
        if (exists $ip_list{$1}) {
            $ip_list{$1}++;
        }
        else {
            $ip_list{$1} = 1;
        }
    }
}
@sorted_ip_list = sort {$sorted_ip_list{$a} cmp $sorted_ip_list{$b}} keys %sorted_ip_list ;
for (my $i=0; $i < 10; $i++) {
    print $sorted_ip_list[$i], "\n";
}





